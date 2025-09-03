import {Condition} from "@/filter/advanced/api/AdvancedFilterModel";
import {filterForColumnType} from "@/filter/basic/FilterModel";
import {AdvancedField, RenderGroupProps} from "@/filter/advanced/conditions/AdvancedConditionsEditorContent";

export function createCondition(props: RenderGroupProps) {
    const firstField: AdvancedField<any> = props.fields[0];

    const newCondition: Condition = {
        id: 0,
        field: firstField,
        operator: filterForColumnType[firstField.columnDataType][0],
        value: null
    }

    props.conditionGroupsState.setValue(
        props.conditionGroupsState.value.map((group, index) => {
            if (index !== props.index) {
                return group;
            }

            return {
                ...group,
                conditions: [...group.conditions, newCondition]
            };
        })
    );
}