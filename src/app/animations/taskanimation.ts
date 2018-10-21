import { animate, state, style, transition, trigger, AUTO_STYLE } from '@angular/animations';

export const ON_OFF_TASK_TRANSITION = [
    trigger('onOffTaskTransition', [
        transition(':enter', [
            style({ paddingTop: 0, paddingBottom: 0, height: 0, opacity: 0 }),
            animate('0.4s ease'),
            // style({ height: '*', overflow: 'hidden'})
        ]),
        transition(':leave', [
            // style({ height: '*', overflow: 'hidden' }),
            animate('0.2s ease'),
            style({ paddingTop: 0, paddingBottom: 0, height: 0, opacity: 0 })
        ])
    ])

];
