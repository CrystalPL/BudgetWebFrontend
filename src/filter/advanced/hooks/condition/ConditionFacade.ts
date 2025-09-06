import {StateProp} from "@/filter/StateProp";
import {AdvancedField, Condition, ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";
import {ConditionDeleter} from "@/filter/advanced/hooks/condition/ConditionDeleter";
import {ConditionUpdater} from "@/filter/advanced/hooks/condition/ConditionUpdater";
import {ConditionCreator} from "@/filter/advanced/hooks/condition/ConditionCreator";

export class ConditionFacade {

    public deleteCondition(conditionGroupsState: StateProp<ConditionGroup[]>, conditionGroupIndex: number, conditionIndex: number) {
        const conditionDeleter: ConditionDeleter = new ConditionDeleter(conditionGroupsState, conditionGroupIndex, conditionIndex);
        conditionDeleter.updateValue()
    }

    public updateCondition(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        conditionIndex: number,
        updates: Partial<Condition>
    ) {
        const conditionUpdater: ConditionUpdater = new ConditionUpdater(conditionGroupsState, conditionGroupIndex, conditionIndex, updates);
        conditionUpdater.updateValue();
    }

    public createCondition(
        conditionGroupsState: StateProp<ConditionGroup[]>,
        conditionGroupIndex: number,
        fields: AdvancedField<any>[]
    ) {
        const conditionCreator: ConditionCreator = new ConditionCreator(conditionGroupsState, conditionGroupIndex, fields);
        conditionCreator.updateValue();
    }
}