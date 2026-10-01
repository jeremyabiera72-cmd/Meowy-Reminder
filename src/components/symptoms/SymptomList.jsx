import { SYMPTOMS, SYMPTOM_CATEGORIES } from "../../data/symptoms";
import SymptomItem from "./SymptomItem";

export default function SymptomList({ selectedSymptoms = [], onChange }) {
    const toggleSymptom = symptomId => {
        if (selectedSymptoms.includes(symptomId)) {
            onChange(selectedSymptoms.filter(id => id !== symptomId));
            return;
        }

        onChange([...selectedSymptoms, symptomId]);
    };

    return (
        <div className="symptom-list">
            {SYMPTOM_CATEGORIES.map(category => {
                const categorySymptoms = SYMPTOMS.filter(symptom => symptom.category === category.id);

                if (categorySymptoms.length === 0) {
                    return null;
                }

                return (
                    <section key={category.id} className="symptom-list__category">
                        <h3 className="symptom-list__category-title">{category.name}</h3>

                        <div className="symptom-list__items">
                            {categorySymptoms.map(symptom => (
                                <SymptomItem
                                    key={symptom.id}
                                    symptom={symptom}
                                    selected={selectedSymptoms.includes(symptom.id)}
                                    onToggle={toggleSymptom}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
