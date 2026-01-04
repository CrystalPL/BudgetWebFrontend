import {
    AdvancedField,
    AdvancedFilter,
    AdvancedFilterEntityType,
    ConditionGroup,
    DuplicateFilterRequest,
    SaveFilterConditionRequest,
    SaveFilterRequest
} from "@/filter/advanced/api/AdvancedFilterModel";
import axios from "axios";
import {API_URL, handleDeleteRequest, handlePostRequest} from "@/service/ResponseAPI";
import {
    ActivateFilterMessage,
    DeleteFilterMessage,
    DuplicateFilterMessage,
    SaveFilterConditionMessage,
    SaveFilterMessage
} from "@/filter/advanced/api/AdvancedFilterMessages";

export async function saveFilterRequest(request: SaveFilterRequest) {
    return handlePostRequest<typeof SaveFilterMessage>("/filter/save", request, SaveFilterMessage);
}

export async function saveFilterConditionRequest(request: SaveFilterConditionRequest) {
    return handlePostRequest<typeof SaveFilterConditionMessage>("/filter/condition/save", request, SaveFilterConditionMessage);
}

export function activateFilter(filterId: number) {
    return handlePostRequest<typeof ActivateFilterMessage>("/filter/activate", {filterId}, ActivateFilterMessage);
}

export function deleteFilter(filterId: number) {
    return handleDeleteRequest<typeof DeleteFilterMessage>(`/filter/delete/${filterId}`, {}, DeleteFilterMessage);
}

export async function getAdvancedFilters(advancedFilterEntityType: AdvancedFilterEntityType) {
    const response = await axios.get<AdvancedFilter[]>(
        `${API_URL}/filter/${advancedFilterEntityType}`,
        {withCredentials: true,}
    )

    return response.data.map((advancedFilter: any): AdvancedFilter => ({
        id: advancedFilter.id,
        name: advancedFilter.name,
        description: advancedFilter.description,
        active: advancedFilter.active,
        createdAt: new Date(advancedFilter.createdAt),
        updatedAt: new Date(advancedFilter.updatedAt),
        totalConditions: advancedFilter.totalConditions,
        totalGroups: advancedFilter.totalGroups
    }));
}

export function duplicateFilter(request: DuplicateFilterRequest) {
    return handlePostRequest<typeof DuplicateFilterMessage>("/filter/duplicate", request, DuplicateFilterMessage);
}

export async function getConditionGroups(advancedFilterId: number, fields: AdvancedField<any>[]) {
    const response = await axios.get<any[]>(
        `${API_URL}/filter/condition/${advancedFilterId}`,
        {withCredentials: true,}
    )

    return response.data.map((group: any): ConditionGroup => ({
        ...group,
        conditions: group.conditions.map((condition: any) => ({
            id: condition.id,
            field: fields.find(f => f.columnName === condition.fieldName) || null,
            operator: condition.operator,
            firstValue: condition.firstValue,
            secondValue: condition.secondValue,
            logicalOperatorBefore: condition.logicalOperatorBefore,
            openParenthesis: condition.openParenthesisNumber,
            closeParenthesis: condition.closeParenthesisNumber
        }))
    }));
}