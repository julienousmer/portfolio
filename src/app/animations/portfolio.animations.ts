import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate(
      '550ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease', style({ opacity: 1 })),
  ]),
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-12px)' }),
    animate(
      '450ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

export const staggerList = trigger('staggerList', [
  transition(':enter', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        stagger(60, [
          animate(
            '450ms cubic-bezier(0.16, 1, 0.3, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

export const heroSequence = trigger('heroSequence', [
  transition(':enter', [
    group([
      query('.hero-line', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(70, [
          animate(
            '600ms cubic-bezier(0.16, 1, 0.3, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ]),
      query('.hero-accent', [
        style({ transform: 'scaleX(0)', opacity: 0 }),
        animate(
          '700ms 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ transform: 'scaleX(1)', opacity: 1 })
        ),
      ]),
    ]),
  ]),
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.98)' }),
    animate(
      '450ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
]);
