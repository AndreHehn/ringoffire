import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
},
)
export class DialogAddPlayerComponent implements OnInit {

  form: FormGroup;
  profiles: string[] = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
  ];
  name: string;
  profile :string;
  defaultProfilePicture = this.profiles[0];

  constructor(   public dialogRef: MatDialogRef< DialogAddPlayerComponent>, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ name: '', profile: this.defaultProfilePicture });
    this.name = this.form.value.name;
    this.profile = this.form.value.profile;
   }

  ngOnInit(): void {
    console.log(this.form);
  }

  onNoClick() { 
this.dialogRef.close();
  }
}
