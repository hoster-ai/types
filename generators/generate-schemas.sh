#!/bin/bash
# convert-to-schemas.sh

# Διαδρομές
DTO_DIR="./dtos"
OUTPUT_DIR="./schemas"
OUTPUT_DTO_DIR="$OUTPUT_DIR/dtos"
OUTPUT_ENUM_DIR="$OUTPUT_DIR/enums"

# Αν δόθηκε tsconfig ως παράμετρος, χρησιμοποίησέ το
if [ ! -z "$1" ]; then
    TSCONFIG="$1"
else
    TSCONFIG="./tsconfig.json"
fi

# Χρώματα για output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔄 Ξεκινάει η μετατροπή DTOs και ENUMs σε JSON Schema..."

# Έλεγχος αν υπάρχει το typescript-json-schema
if ! command -v typescript-json-schema &> /dev/null; then
    echo -e "${RED}❌ Το typescript-json-schema δεν βρέθηκε!${NC}"
    echo "Εγκατάσταση: npm install -g typescript-json-schema"
    exit 1
fi

# Εύρεση του tsconfig.json - ψάξε στον τρέχοντα φάκελο και στον parent
if [ -f "./tsconfig.json" ]; then
    TSCONFIG="./tsconfig.json"
elif [ -f "../tsconfig.json" ]; then
    TSCONFIG="../tsconfig.json"
elif [ -f "../../tsconfig.json" ]; then
    TSCONFIG="../../tsconfig.json"
else
    echo -e "${RED}❌ Το tsconfig.json δεν βρέθηκε!${NC}"
    echo "Αναζήτηση σε: ./, ../, ../../"
    echo "Τρέχον directory: $(pwd)"
    exit 1
fi

echo -e "${GREEN}✓ Βρέθηκε tsconfig.json: $TSCONFIG${NC}"

# Δημιουργία φακέλων
mkdir -p "$OUTPUT_DTO_DIR" "$OUTPUT_ENUM_DIR"

# Μετρητές
total_files=0
total_types=0
successful=0

# Temporary file για error logging
ERROR_LOG=$(mktemp)

# Συνάρτηση για recursive αναζήτηση αρχείων .ts
find_ts_files() {
    find "$DTO_DIR" -name "*.ts" -type f | sort
}

# Για κάθε TypeScript αρχείο (recursive)
while IFS= read -r file; do
    if [ -f "$file" ]; then
        # Υπολογισμός relative path από το DTO_DIR
        relative_path="${file#$DTO_DIR/}"
        relative_dir=$(dirname "$relative_path")
        filename=$(basename "$file")
        
        echo -e "\n📄 Επεξεργασία: ${BLUE}$relative_path${NC}"
        ((total_files++))
        
        # Εξαγωγή όλων των exported interfaces, types και classes
        # Διορθωμένο regex που πιάνει μόνο το όνομα του type
        types=$(grep -E "^export\s+(interface|class|type)\s+[A-Za-z0-9_]+" "$file" | \
                awk '{print $3}' | \
                sed 's/{$//' | \
                sed 's/\s*extends.*//')
        
        # Εξαγωγή όλων των exported enums
        enums=$(grep -E "^export\s+enum\s+[A-Za-z0-9_]+" "$file" | \
                awk '{print $3}' | \
                sed 's/{$//')
        
        # Debug output αν είναι ενεργοποιημένο
        if [ "$DEBUG" = "1" ]; then
            echo -e "  ${YELLOW}[DEBUG] Types found: $(echo $types | tr '\n' ', ')${NC}"
            echo -e "  ${YELLOW}[DEBUG] Enums found: $(echo $enums | tr '\n' ', ')${NC}"
        fi
        
        # Μετατροπή DTOs/Interfaces
        if [ ! -z "$types" ]; then
            for type_name in $types; do
                if [ ! -z "$type_name" ]; then
                    ((total_types++))
                    # Μετατροπή CamelCase σε kebab-case
                    output_name=$(echo "$type_name" | sed -E 's/([A-Z])/-\1/g' | tr '[:upper:]' '[:lower:]' | sed 's/^-//' | sed 's/-dto$//')
                    
                    # Δημιουργία του output directory με την ίδια δομή
                    output_dir="$OUTPUT_DTO_DIR"
                    if [ "$relative_dir" != "." ]; then
                        output_dir="$OUTPUT_DTO_DIR/$relative_dir"
                        mkdir -p "$output_dir"
                    fi
                    output_file="$output_dir/${output_name}.dto.schema.json"
                    
                    echo -e "  → Μετατροπή DTO: ${YELLOW}$type_name${NC}"
                    
                    # Εκτέλεση με tsconfig.json και refs για να μην ενσωματώνει τα enums
                    if typescript-json-schema --noExtraProps --required --refs --aliasRefs --topRef --jsDoc extended "$TSCONFIG" "$type_name" -o "$output_file" 2>"$ERROR_LOG"; then
                        if [ -f "$output_file" ] && [ -s "$output_file" ]; then
                            echo -e "    ${GREEN}✓ Επιτυχής${NC} → $(basename "$output_file")"
                            ((successful++))
                        else
                            echo -e "    ${RED}✗ Αποτυχία${NC} - Κενό αρχείο"
                            rm -f "$output_file"
                        fi
                    else
                        echo -e "    ${RED}✗ Αποτυχία${NC}"
                        if [ -s "$ERROR_LOG" ]; then
                            error_msg=$(cat "$ERROR_LOG" | head -n 1)
                            echo -e "    ${RED}Σφάλμα: $error_msg${NC}"
                        fi
                    fi
                fi
            done # <<< "$types" replaced by for loop
        fi
        
        # Μετατροπή ENUMs
        if [ ! -z "$enums" ]; then
            for enum_name in $enums; do
                if [ ! -z "$enum_name" ]; then
                    ((total_types++))
                    # Μετατροπή CamelCase σε kebab-case
                    output_name=$(echo "$enum_name" | sed -E 's/([A-Z])/-\1/g' | tr '[:upper:]' '[:lower:]' | sed 's/^-//')
                    
                    # Δημιουργία του output directory με την ίδια δομή
                    output_dir="$OUTPUT_ENUM_DIR"
                    if [ "$relative_dir" != "." ]; then
                        output_dir="$OUTPUT_ENUM_DIR/$relative_dir"
                        mkdir -p "$output_dir"
                    fi
                    output_file="$output_dir/${output_name}.enum.schema.json"
                    
                    echo -e "  → Μετατροπή ENUM: ${YELLOW}$enum_name${NC}"
                    
                    # Εκτέλεση με tsconfig.json - για enums δεν χρειάζονται refs
                    if typescript-json-schema --noExtraProps --required --jsDoc extended "$TSCONFIG" "$enum_name" -o "$output_file" 2>"$ERROR_LOG"; then
                        if [ -f "$output_file" ] && [ -s "$output_file" ]; then
                            echo -e "    ${GREEN}✓ Επιτυχής${NC} → $(basename "$output_file")"
                            ((successful++))
                        else
                            echo -e "    ${RED}✗ Αποτυχία${NC} - Κενό αρχείο"
                            rm -f "$output_file"
                        fi
                    else
                        echo -e "    ${RED}✗ Αποτυχία${NC}"
                        if [ -s "$ERROR_LOG" ]; then
                            error_msg=$(cat "$ERROR_LOG" | head -n 1)
                            echo -e "    ${RED}Σφάλμα: $error_msg${NC}"
                        fi
                    fi
                fi
            done # <<< "$enums" replaced by for loop
        fi
        
        # Αν δεν βρέθηκαν types
        if [ -z "$types" ] && [ -z "$enums" ]; then
            echo -e "  ${YELLOW}ℹ Δεν βρέθηκαν exported types${NC}"
        fi
    fi
done < <(find_ts_files)

# Cleanup
rm -f "$ERROR_LOG"

# Τελική αναφορά
echo -e "\n📊 Αποτελέσματα:"
echo -e "  Αρχεία που επεξεργάστηκαν: $total_files"
echo -e "  Types που βρέθηκαν: $total_types"
echo -e "  ${GREEN}Επιτυχείς μετατροπές: $successful${NC}"
failed=$((total_types - successful))
if [ $failed -gt 0 ]; then
    echo -e "  ${RED}Αποτυχίες: $failed${NC}"
fi

echo -e "\n✨ Ολοκληρώθηκε! Τα schemas αποθηκεύτηκαν στο: $OUTPUT_DIR"

# Εμφάνιση δομής φακέλων αν υπάρχουν αρχεία
if [ $successful -gt 0 ]; then
    echo -e "\n📁 Δημιουργημένα αρχεία:"
    
    dto_count=$(find "$OUTPUT_DTO_DIR" -name "*.json" -type f 2>/dev/null | wc -l)
    enum_count=$(find "$OUTPUT_ENUM_DIR" -name "*.json" -type f 2>/dev/null | wc -l)
    
    if [ $dto_count -gt 0 ]; then
        echo -e "\n${BLUE}DTOs ($dto_count αρχεία):${NC}"
        find "$OUTPUT_DTO_DIR" -name "*.json" -type f 2>/dev/null | sort | while read -r f; do
            size=$(ls -lh "$f" | awk '{print $5}')
            echo "  - $(basename "$f") [$size]"
        done
    fi
    
    if [ $enum_count -gt 0 ]; then
        echo -e "\n${BLUE}ENUMs ($enum_count αρχεία):${NC}"
        find "$OUTPUT_ENUM_DIR" -name "*.json" -type f 2>/dev/null | sort | while read -r f; do
            size=$(ls -lh "$f" | awk '{print $5}')
            echo "  - $(basename "$f") [$size]"
        done
    fi
fi

# Προαιρετική δημιουργία index file με όλα τα schemas
if [ "$CREATE_INDEX" = "1" ] && [ $successful -gt 0 ]; then
    echo -e "\n📝 Δημιουργία index file..."
    INDEX_FILE="$OUTPUT_DIR/index.json"
    
    echo "{" > "$INDEX_FILE"
    echo '  "dtos": [' >> "$INDEX_FILE"
    find "$OUTPUT_DTO_DIR" -name "*.json" -type f | sort | while read -r f; do
        basename "$f" | sed 's/^/    "/' | sed 's/$/",/'
    done | sed '$ s/,$//' >> "$INDEX_FILE"
    echo '  ],' >> "$INDEX_FILE"
    echo '  "enums": [' >> "$INDEX_FILE"
    find "$OUTPUT_ENUM_DIR" -name "*.json" -type f | sort | while read -r f; do
        basename "$f" | sed 's/^/    "/' | sed 's/$/",/'
    done | sed '$ s/,$//' >> "$INDEX_FILE"
    echo '  ]' >> "$INDEX_FILE"
    echo "}" >> "$INDEX_FILE"
    
    echo -e "${GREEN}✓ Index file δημιουργήθηκε: $INDEX_FILE${NC}"
fi

# Post-processing για διαχωρισμό enums
if [ "$successful" -gt 0 ]; then
    echo -e "\n🔧 Εκτέλεση post-processing για διαχωρισμό enums..."
    
    # Έλεγχος αν υπάρχει το post-process-schemas.js
    if [ -f "post-process-schemas.js" ]; then
        if command -v node &> /dev/null; then
            if node post-process-schemas.js; then
                echo -e "${GREEN}✓ Post-processing ολοκληρώθηκε επιτυχώς${NC}"
            else
                echo -e "${YELLOW}⚠ Post-processing απέτυχε${NC}"
            fi
        else
            echo -e "${YELLOW}⚠ Το Node.js δεν βρέθηκε - παράλειψη post-processing${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Το post-process-schemas.js δεν βρέθηκε${NC}"
        echo "Τοποθέτησε το post-process-schemas.js στον ίδιο φάκελο με το generate-schemas.sh"
    fi
fi

echo -e "\n🎉 Όλες οι διεργασίες ολοκληρώθηκαν!"