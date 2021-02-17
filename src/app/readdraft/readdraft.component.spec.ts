import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaddraftComponent } from './readdraft.component';

describe('ReaddraftComponent', () => {
  let component: ReaddraftComponent;
  let fixture: ComponentFixture<ReaddraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaddraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaddraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
