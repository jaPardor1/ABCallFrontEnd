import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { ArticleService } from '../../service/knowledgebase/article.service';
import { ArticleResultDto } from '../articleResult';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../shared/detail-dialog/detail-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  @ViewChild('searchContent') searchContent!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  public articlesList: any;
  displayedColumns: string[] = ['title', 'content'];
  isNotFound:boolean=true;

  constructor(private articleService: ArticleService, public dialog: MatDialog,@Inject('tabData') public gestion: boolean) { }

  public searchArticles() {
    const content = this.searchContent.nativeElement.value;
    console.log("Content: " + content);
    this.articleService.filterArticles(content).subscribe(
      (response: ArticleResultDto[]) => this.listFoundArticles(response),
      (error: any) => console.error(error)
    );
  }

  public listFoundArticles(list: ArticleResultDto[]) {
    this.isNotFound=(list.length==0)
    this.articlesList = new MatTableDataSource<ArticleResultDto>(list);
    this.articlesList.paginator = this.paginator;
  }


  toggleContent(article: any): void {
    article.isExpanded = !article.isExpanded;
  }

  openDialog(articleData: ArticleResultDto): void {
    this.dialog.open(DetailDialogComponent, {
      data: { articleData },
    });
  }


}
