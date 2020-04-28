import {FormControl} from '@angular/forms';

export enum UserDataInputTypes {
    TEXT,
    SELECT,
    DATE
}

export enum definedFormControl {
    EMAIL,
    PASSWORD,
    PASSWORD2,
    NAME,
    NEPTUN,
    NATIONALITY,
    GENDER
}

export interface UserDataInput {
    type: UserDataInputTypes;
    id: string;
    formControl?: FormControl; // text
    existingFormControl?: definedFormControl; // text
    dependsOn?: any; // ex. other formcontrol if want to check if 2 pw are equal
    translateId: string;
    required: boolean;
    value: any;
    textType?: string; // text --- pw, text, etc
    placeholder?: string; // text
    selectKeysValues?: { [key: string]: any};
}
