import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service'
import {IEMyBlog} from './myblog'
import * as moment from 'moment';
import * as _ from "lodash";


let  GraphData:any

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
  
  MyBlogs:any
  GraphBlogId:any
  LoadApi:boolean=false
  showGraph:boolean=false
  Week:any
  chartColumns:any=["week","views"]
  charttype:any='LineChart'
  ArrayFromGraphData:any=[]
  charTitle:any="Weekly views"
  myOptions = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  }
  //GraphData:any
  // UserId=JSON.parse(localStorage.getItem('User'))

  constructor(private MyBlogServices:ConfigService) { }
  

  ngOnInit(): void {
    var myBlogData=new IEMyBlog()
    this.MyBlogServices.FetchMyBlog()
    .subscribe(result=>{
      console.log(result)
      this.FetchMyBlogs(result)
      this.LoadApi=true
      console.log(this.LoadApi)
      //myBlogData=result.data
    },
    err=>{
        console.log(err)
    })
  }

  FetchMyBlogs(MyBlogsData:any)
  {
    this.MyBlogs=MyBlogsData
   console.log("MyBlogs",this.MyBlogs)
  }

  showstats(e:any)
  {
    console.log(e)
    this.showGraph=true
    this.GraphBlogId=e
    this.Week=[...this.GraphBlogId]
    console.log(this.Week)

    this.Week.forEach((d:any)=>{
      d.dateObj =  moment(d.dateonview);  
    });
  
    function  buildData(data:any, keyName:any ){
        let result:Array<object>=[]
        _.forEach(data, (val, key)=>{
          //key is week ,month or year depend upon method
        // console.log("val",val,"length",val.length)
          //console.log("key",key) 
          console.log("type of result ",typeof(result))
          result.push({[keyName]:key, count:val.length})
        })
        return result;
    }

 

    function  groupAndBuild(data:any, dateMethod:any , groupKey:any) {
        let groupedData = _.groupBy(data, (d)=>{
          return d.dateObj[dateMethod]()
        })
        //let GraphData:any
          console.log(buildData(groupedData, groupKey))
        GraphData=[...buildData(groupedData, groupKey)]
        return buildData(groupedData, groupKey)
    }

    console.log(groupAndBuild(this.Week,'week','week'))
    console.log(GraphData)
  
   
  const that = this;
  GraphData.forEach(ConverToGraph)
  function ConverToGraph(item:any,index:any)
  {
    that.ArrayFromGraphData[index]= Object.values(GraphData[index])
  }

  console.log(that.ArrayFromGraphData)

  this.chartColumns = ['Week', 'Views']
  
  }

}
