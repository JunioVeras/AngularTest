import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoService } from '../services/todo.service';
import { Lista } from './lista';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

  trashIcon = faTrash;
  input: string = "";
  last: number = 1;

  constructor(private todoservice: ToDoService) { }

  ngOnInit(): void {
    this.getList();
  }

  lista: Lista[] = []

  getList()
  {
    this.todoservice.getList().subscribe( (valor) => {this.lista = valor;} );
    this.last = 1;
  }

  getUndone()
  {
    this.todoservice.getUndone().subscribe( (valor) => {this.lista = valor;} );
    this.last = 2;
  }

  done(id: number | undefined)
  {
    if(id)
    {
      this.todoservice.done(id).subscribe( (valor) => console.log(valor) );
    }
  }

  add()
  {
    if(this.input != '')
    {
      this.todoservice.add(this.input).subscribe( (valor) => console.log(valor) );
    }
    if(this.last == 1)
    {
      this.getList();
    }
    if(this.last == 2)
    {
      this.getUndone(); 
    }
  }

  delete(id: number | undefined)
  {
    if(id)
    {
      this.todoservice.delete(id).subscribe();
    }
    if(this.last == 1)
    {
      this.getList();
    }
    if(this.last == 2)
    {
      this.getUndone(); 
    }
  }
}