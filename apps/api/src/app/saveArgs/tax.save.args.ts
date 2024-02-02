import {Field, InputType} from "@nestjs/graphql";
import {BaseSaveArgs} from "./base.save.args";
import {TaxSaveArgsModel} from "../../model";

@InputType()
export class TaxSaveArgs extends BaseSaveArgs implements TaxSaveArgsModel {
    @Field()
    displayName: string;
    @Field()
    ratePercent: number;
    @Field()
    isStandard: boolean;
}