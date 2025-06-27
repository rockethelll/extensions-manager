import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExtension } from './list-extension';

describe('ListExtension', () => {
  let component: ListExtension;
  let fixture: ComponentFixture<ListExtension>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExtension]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExtension);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
