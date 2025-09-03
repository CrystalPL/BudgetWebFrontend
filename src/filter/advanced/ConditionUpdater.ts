import {Condition, ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {StateProp} from "@/filter/StateProp";

export class ConditionUpdater {
    constructor(
        private conditionGroupsState: StateProp<ConditionGroup[]>,
        private conditionGroupIndex: number,
        private conditionIndex: number,
        private fieldName: keyof Condition,
        private newValue: any
    ) {
    }

    updateValue() {
        const updatedGroups = this.conditionGroupsState.value.map(this.getUpdateConditionGroups.bind(this));

        this.conditionGroupsState.setValue(updatedGroups);
    }

    private getUpdateConditionGroups(group: ConditionGroup, conditionGroupIndex: number): ConditionGroup {
        if (conditionGroupIndex !== this.conditionGroupIndex) {
            return group
        }

        return this.updateConditions(group);
    }

    private updateConditions(group: ConditionGroup): ConditionGroup {
        return {
            ...group,
            conditions: group.conditions.map(this.updateSingleCondition.bind(this)),
        }
    }

    private updateSingleCondition(condition: Condition, conditionIndex: number) {
        if (conditionIndex !== this.conditionIndex) {
            return condition
        }

        return {...condition, [this.fieldName]: this.newValue};
    }
}