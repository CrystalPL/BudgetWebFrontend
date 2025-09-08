import * as React from "react";
import {Box, FormControl, MenuItem, Paper, Select, Typography} from "@mui/material";
import {StateProp} from "@/filter/StateProp";
import {ConditionGroup} from "@/filter/advanced/api/AdvancedFilterModel";

export interface RenderLogicalOperatorBetweenConditionGroupsProps {
    conditionGroupsState: StateProp<ConditionGroup[]>
    conditionGroupIndex: number
    conditionGroup: ConditionGroup
}

export function RenderLogicalOperatorBetweenConditionGroups(props: RenderLogicalOperatorBetweenConditionGroupsProps) {
    if (props.conditionGroupIndex == 0) {
        return <></>
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2
        }}>
            <Paper sx={{p: 1, border: '1px solid #e0e0e0'}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Typography variant="body2" color="text.secondary">
                        Operator przed grupą:
                    </Typography>
                    <FormControl size="small" sx={{minWidth: 100}}>
                        <Select
                            value={props.conditionGroup.logicalOperatorBefore}
                            // onChange={(e) => handleUpdateGroupLogicalOperatorBefore(group.id, e.target.value as LogicalOperator)}
                            variant="outlined"
                            sx={{fontSize: '0.875rem'}}
                        >
                            <MenuItem value="AND">I</MenuItem>
                            <MenuItem value="OR">LUB</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>
        </Box>
    )
}