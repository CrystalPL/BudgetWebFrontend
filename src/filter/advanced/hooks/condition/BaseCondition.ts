import {StateProp} from "@/filter/StateProp";
import {ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";

export abstract class BaseCondition {
    protected constructor(
        protected conditionGroupsState: StateProp<ConditionGroup[]>,
        protected conditionGroupIndex: number
    ) {
    }

    updateValue() {
        const updatedGroups = this.conditionGroupsState.value.map((conditionGroup, conditionGroupIndex) => {
            if (conditionGroupIndex !== this.conditionGroupIndex) {
                return conditionGroup
            }

            return this.getUpdatedConditionGroups(conditionGroup)
        });

        this.conditionGroupsState.setValue(updatedGroups);
    }

    protected abstract getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup;
}