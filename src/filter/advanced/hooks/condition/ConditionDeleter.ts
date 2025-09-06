import {BaseCondition} from "@/filter/advanced/hooks/condition/BaseCondition";
import {ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {StateProp} from "@/filter/StateProp";

export class ConditionDeleter extends BaseCondition {
    constructor(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        private conditionIndex: number
    ) {
        super(conditionGroupsState, conditionGroupIndex);
    }

    protected getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup {
        return {
            ...group,
            conditions: group.conditions.filter((_condition, index) => index !== this.conditionIndex),
        }
    }
}