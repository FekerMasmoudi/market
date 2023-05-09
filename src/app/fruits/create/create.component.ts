import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';
 
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  allCategories: Category[]=[];
  fruitForm: Fruits = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    category:{
      id: 0,
      name: '',
      description: ''
    }
  };
 
  constructor(private fruitService:FruitsService,
    private categoryService: CategoryService,
    private router:Router) {}
 
  ngOnInit(): void {
    this.get();
  }
 
  get() {
    this.categoryService.get().subscribe((data) => {
      this.allCategories = data;

    });
  }
 
  create(){
    console.log("form data:",this.fruitForm);
    this.fruitService.create(this.fruitForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/fruits/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}