import {RenderConditionLineProps} from "../../../api/AdvancedFilterModel";
import * as React from "react";
import {updateField} from "../../../conditions/AdvancedConditionsEditorContent";
import {Button, InputAdornment, TextField} from "@mui/material";

export interface RenderParenthesesProps extends RenderConditionLineProps {
    type: "open" | "close";
}

export function RenderParentheses(props: RenderParenthesesProps) {
    const isOpen = props.type === "open";
    const key = isOpen ? "openParenthesis" : "closeParenthesis";
    const symbol = isOpen ? "(" : ")";

    return (
        <TextField
            sx={{
                maxWidth: "100px",
                "& .MuiOutlinedInput-root": {
                    p: 0,
                    "& fieldset": {
                        border: "none",
                    },
                },
            }}
            fullWidth
            value={symbol.repeat((props.condition as any)[key] || 0)}
            onChange={(event) =>
                updateField(props, {[key]: event.target.value.length})
            }
            size="small"
            slotProps={{
                input: {
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end" sx={{display: "flex"}}>
                            <Button
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    p: 0,
                                    pr: 1,
                                    color: "green",
                                    "&:hover": {
                                        backgroundColor: "rgba(75,187,71,0.2)",
                                    },
                                }}
                                onClick={() => {
                                    const newValue = Math.max(
                                        ((props.condition as any)[key] || 0) - 1,
                                        0
                                    );
                                    updateField(props, {[key]: newValue});
                                }}
                            >
                                -{symbol}
                            </Button>
                            <Button
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    p: 0,
                                    pl: 1,
                                    color: "green",
                                    "&:hover": {
                                        backgroundColor: "rgba(75,187,71,0.2)",
                                    },
                                }}
                                onClick={() => {
                                    const newValue = ((props.condition as any)[key] || 0) + 1;
                                    updateField(props, {[key]: newValue});
                                }}
                            >
                                +{symbol}
                            </Button>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}