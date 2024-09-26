import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoAddEditComponent } from './todo-add-edit/todo-add-edit.component';
import { TodosService } from './service/todos.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'description', 'username', 'targetDate','status','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _todosService: TodosService,
    private _coreSerivce: CoreService
  ){}
  
  ngOnInit(): void {
    this.getAllTodos();
  }

  openAddEditTodoForm(){
    const dialogRef=this._dialog.open(TodoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getAllTodos();
        }
      }
    });
  }

  getAllTodos(){
    this._todosService.getAllTodos().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTodo(id:number){
    this._todosService.deleteTodo(id).subscribe({
      next: (res) => {
        this._coreSerivce.openSnackBar('Todos Deleted!', 'done');
        this.getAllTodos();
      },
      error: console.log,
    });
  }

  openEditTodoForm(data: any){
    const dialogRef=this._dialog.open(TodoAddEditComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getAllTodos();
        }
      }
    });
  }
}
