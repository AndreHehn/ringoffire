import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  form2: FormGroup;
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
    this.form2 = this.formBuilder.group({ name: '', profile: this.defaultProfilePicture });
    this.name = this.form2.value.name;
    this.profile = this.form2.value.profile;
   }

  ngOnInit(): void {

  }

  onNoClick() { 
this.dialogRef.close();
  }
}
