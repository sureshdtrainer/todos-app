import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodosService } from '../service/todos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrl: './todo-add-edit.component.css'
})
export class TodoAddEditComponent implements OnInit{

  todoForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _todosService: TodosService, 
    private _dialogRef: MatDialogRef<TodoAddEditComponent>,
    private _coreSerivce: CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.todoForm = this._fb.group({
      description: '',
      username: '',
      targetDate: '',
      status: ''
    });
  }
  ngOnInit(): void {
    this.todoForm.patchValue(this.data);
  }

  onTodoFormSubmit() {
    if (this.todoForm.valid) {
      if(this.data){
        this._todosService.updateTodo(this.data.id, this.todoForm.value).subscribe({
          next: (val: any) => {
            this._coreSerivce.openSnackBar('Todos Updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });   
      }else{
        this._todosService.addTodo(this.todoForm.value).subscribe({
          next: (val: any) => {
            this._coreSerivce.openSnackBar('Todos Added!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
