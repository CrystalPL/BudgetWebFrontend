import {BaseCondition} from "@/filter/advanced/hooks/condition/BaseCondition";
import {StateProp} from "@/filter/StateProp";
import {ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";

export class ConditionGroupUpdater extends BaseCondition {
    constructor(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        private updates: Partial<ConditionGroup>
    ) {
        super(conditionGroupsState, conditionGroupIndex);
    }

    protected getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup {
        return {
            ...group,
            ...this.updates,
        }
    }
}