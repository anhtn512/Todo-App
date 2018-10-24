import { animate, state, style, transition, trigger, AUTO_STYLE } from '@angular/animations';

export const ON_OFF_TASK_TRANSITION = [
    trigger('onOffTodoApp', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(300px)' }),
            animate('0.4s ease'),
            style({ opacity: 1, transform: 'translateY(0px)' })
        ]),
        transition(':leave', [
            style({ opacity: 1, transform: 'translateY(0px)' }),
            animate('0.4s ease'),
            style({ opacity: 0, transform: 'translateY(300px)' })
        ])
    ]),
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
    ]),
    trigger('moveIn', [
        // state('void', style({ position: 'fixed', width: '100%' })),
        // state('*', style({ position: 'fixed', width: '100%' })),
        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(100px)' }),
            animate('.6s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: '1', transform: 'translateX(0)' }),
            animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
        ])
    ]),
    trigger('fallIn', [
        transition(':enter', [
            style({ opacity: '0', transform: 'translateY(40px)' }),
            animate('.4s .2s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: '1', transform: 'translateX(0)' }),
            animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
        ])
    ]),
    trigger('moveInLeft', [
        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(-100px)' }),
            animate('.6s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ])
    ])

];
