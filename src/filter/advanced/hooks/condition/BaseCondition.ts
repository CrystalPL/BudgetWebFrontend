import {StateProp} from "@/filter/StateProp";
import {ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";

export abstract class BaseCondition {
    protected constructor(
        protected conditionGroupsState: StateProp<ConditionGroup[]>,
        protected conditionGroupIndex: number
    ) {
    }

    updateValue() {
        this.conditionGroupsState.setValue(prevGroups => {
            return prevGroups.map((conditionGroup, index) => {
                if (index !== this.conditionGroupIndex) {
                    return conditionGroup;
                }

                return this.getUpdatedConditionGroups(conditionGroup);
            });
        });
    }

    protected abstract getUpdatedConditionGroups(group: ConditionGroup): ConditionGroup;
}