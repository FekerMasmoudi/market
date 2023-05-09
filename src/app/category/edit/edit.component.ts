import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  categoryForm: Category = {
    id: 0,
    name: '',
    description: ''
  };
 
  constructor(private categoryService:CategoryService,
    private route: ActivatedRoute,
    private router:Router) {}
 
    ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        var id = Number(param.get('id'));
        this.getById(id);
      });
    }
   
    getById(id: number) {
      this.categoryService.getById(id).subscribe((data) => {
        this.categoryForm = data;
      });
    }
   
 
  save(){
    this.categoryService.update(this.categoryForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/category/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}