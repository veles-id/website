import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

type TimelineItem = {
  years: number;
  title: string;
  content: string;
};

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    years: 1500,
    title: 'The Identity of the Church',
    content: `When the Church held the keys to knowledge, it was also holding people’s identifiers in their records.`,
  },
  {
    years: 500,
    title: 'The Identity of the State',
    content: `The invention of the printing press took away the keys to knowledge from the Church and ignited the Industrial Age, 
      when states began to develop more centralized systems for maintaining people’s identifiers.`,
  },
  {
    years: 30,
    title: 'The Identity of Corporations',
    content: `The collection and use of personal data by corporations track back to the growth of the Internet in the 1990s. 
      Digital Age changed the balance of power from the State to global corporations.`,
  },
  {
    years: 3,
    title: 'The Identity of the People',
    content: `Decentralized identity standards from W3C empower individuals in more control over personal ids and data. 
      The identity of people represents the shift of power from corporations to the people.`,
  },
];

@Component({
  selector: 'app-timeline',
  imports: [MatIconModule, CdkAccordionModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [animate('200ms ease-in-out')]),
    ]),
    trigger('numberSize', [
      state(
        'normal',
        style({
          fontSize: '1em',
        })
      ),
      state(
        'expanded',
        style({
          fontSize: '10em',
        })
      ),
      transition('normal <=> expanded', [animate('200ms ease-in-out')]),
    ]),
    trigger('labelSize', [
      state(
        'hidden',
        style({
          fontSize: '0px',
        })
      ),
      state(
        'visible',
        style({
          fontSize: '30px',
        })
      ),
      transition('hidden <=> visible', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class TimelineComponent implements OnInit {
  private __destroyRef = inject(DestroyRef);
  private __breakpoint = inject(BreakpointObserver);
  private __displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  items = TIMELINE_ITEMS;
  breakpoint = signal<string | undefined>('');

  ngOnInit(): void {
    this.__breakpoint
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntilDestroyed(this.__destroyRef))
      .subscribe((result: any) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const layout = this.__displayNameMap.get(query);
            console.log('layout:', layout);
            this.breakpoint.set(layout);
          }
        }
      });
  }

  expanded(item: TimelineItem): boolean {
    return item === this.items[0];
  }
}
