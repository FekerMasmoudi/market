import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allCatgories: Category[] = [];
  deleteModal: any;
  idTodelete: number = 0;
 
  constructor(private categoryService: CategoryService) {}
 
  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.get();
  }
 
  get() {
    this.categoryService.get().subscribe((data) => {
      this.allCatgories = data;

    });
  }
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    this.categoryService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allCatgories = this.allCatgories.filter(_ => _.id != this.idTodelete)
        this.deleteModal.hide();
      },
    });
}
}