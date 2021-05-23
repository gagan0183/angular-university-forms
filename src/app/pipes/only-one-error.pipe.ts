import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(errors: any, priorities: string[]) {
        if (!errors) {
            return null;
        }
        const onlyOneError: any = {};
        for (const priority of priorities) {
            if (errors[priority]) {
                onlyOneError[priority] = errors[priority];
                break;
            }
        }
        return onlyOneError;
    }
}