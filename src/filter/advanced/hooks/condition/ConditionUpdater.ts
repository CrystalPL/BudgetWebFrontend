import {Condition, ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {StateProp} from "@/filter/StateProp";
import {BaseCondition} from "@/filter/advanced/hooks/condition/BaseCondition";

export class ConditionUpdater extends BaseCondition {
    constructor(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        private conditionIndex: number,
        private updates: Partial<Condition>
    ) {
        super(conditionGroupsState, conditionGroupIndex);
    }


    protected getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup {
        return {
            ...group,
            conditions: group.conditions.map(this.updateSingleCondition.bind(this)),
        }
    }

    private updateSingleCondition(condition: Condition, conditionIndex: number) {
        if (conditionIndex !== this.conditionIndex) {
            return condition
        }

        return {...condition, ...this.updates};
    }
}