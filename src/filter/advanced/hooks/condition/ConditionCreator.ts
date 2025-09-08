import {AdvancedField, Condition, ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {filterForColumnType} from "@/filter/FilterModel";
import {BaseCondition} from "@/filter/advanced/hooks/condition/BaseCondition";
import {StateProp} from "@/filter/StateProp";

export class ConditionCreator extends BaseCondition {
    constructor(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        private fields: AdvancedField<any>[]
    ) {
        super(conditionGroupsState, conditionGroupIndex);
    }

    protected getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup {
        const firstField: AdvancedField<any> = this.fields[0];
        const newCondition: Condition = {
            id: 0,
            field: firstField,
            operator: filterForColumnType[firstField.columnDataType][0],
            value: null
        }

        return {
            ...group,
            conditions: [...group.conditions, newCondition]
        };
    }

}