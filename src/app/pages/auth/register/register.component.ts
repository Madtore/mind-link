import { Component, OnInit} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { PatientCreate } from '../../../common/login/PatientCreate';
import { DoctorCreate } from '../../../common/login/DoctorCreate';
import { Gender } from '../../../common/login/enum/Gender';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  today!: string;  
  registerForm!: FormGroup;
  userType: string = 'paciente';
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';


  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    const today = new Date();

    // Set max date to 18 years ago
    const maxYear = new Date();
    maxYear.setFullYear(today.getFullYear() - 18);
    this.today = maxYear.toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dateOfBirth: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      userType: ['paciente', Validators.required],
      specialization: [''],
      licenseNumber: [''],
      priceHour: [null],
      termsAccepted: [false, Validators.requiredTrue]
    });

    this.registerForm.get('userType')?.valueChanges.subscribe((userType) => {
      if (userType === 'paciente') {
        this.registerForm.get('specialization')?.clearValidators();
        this.registerForm.get('licenseNumber')?.clearValidators();
        this.registerForm.get('priceHour')?.clearValidators();
      } else {
        this.registerForm.get('specialization')?.setValidators(Validators.required);
        this.registerForm.get('licenseNumber')?.setValidators(Validators.required);
        this.registerForm.get('priceHour')?.setValidators([Validators.required, Validators.min(1)]);
      }
      this.registerForm.get('specialization')?.updateValueAndValidity();
      this.registerForm.get('licenseNumber')?.updateValueAndValidity();
      this.registerForm.get('priceHour')?.updateValueAndValidity();
    });
  }

  mapFormToUserType(): PatientCreate | DoctorCreate {
    const formValue = this.registerForm.value;

    if (formValue.userType === 'paciente') {
      return new PatientCreate(
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.password,
        formValue.dateOfBirth,
        formValue.gender as Gender
      );
    } else if (formValue.userType === 'medico') {
      return new DoctorCreate(
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.password,
        formValue.dateOfBirth,
        formValue.gender as Gender,
        formValue.specialization,
        formValue.licenseNumber,
        formValue.priceHour
      );
    }

    throw new Error('Invalid user type');
  }

  onSubmit(): void {
    const user = this.mapFormToUserType();

    if (user instanceof PatientCreate) {

      this.authService.patientRegister(user).subscribe({
        next: (response) => {
          console.log("Success:", response);
          this.router.navigateByUrl("/login");
          console.log(response.body.message, 'success');
        },
        error: (error) => {
          if(error.error.password!=undefined){
            console.log(error.error.password, 'error')
          }else{
            console.log(error.error.message, 'error')
          }  
        }
      });

    } else if (user instanceof DoctorCreate) {

      this.authService.doctorRegister(user).subscribe({
        next: (response) => {
          console.log("Success:", response);
          console.log(response.body.message, 'success');
          this.router.navigateByUrl("/login");
        },
        error: (error) => {
          if(error.error.password!=undefined){
            alert("Error: "+ error.error.password);
          }else{
            console.log(error.error.message);
            alert(error.error.message)
          }  
        }
      });
    } else {
      console.log('Unknown user type');
      return;
    }
  }
  
}
