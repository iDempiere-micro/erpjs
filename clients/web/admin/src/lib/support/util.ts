import type {EntityDetailDisplayable} from "../model/model";
import type {ListItemType} from "../../dsl/types";
import type {SelectItem} from "./select";

export const mapDisplayableToListItem = (data: EntityDetailDisplayable[]): ListItemType[] =>
    data
        ? data.map(({ id, displayName }) => ({
            value: id.toString(),
            text: displayName,
        }))
        : [];

export const mapDisplayableToSelectItem = (data: EntityDetailDisplayable[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
            value: id,
            label: displayName,
        }))
        : [];
