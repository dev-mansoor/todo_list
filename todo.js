    //color
    //rgba(242,242,242,255) light background
    //rgba(25,23,21,255) dark background
    //<i class="fas fa-th-list"></i> list icon
    //<i class="fas fa-th"></i> grid
    
    
    var add_new_list = document.getElementById("add_new_list");
    var pop_up_frame = document.getElementById("pop_up_frame");
    var pop_up_background = document.getElementById("pop_up_background");
    
    var show = document.getElementById("show");

    add_new_list.addEventListener("click",()=> 
    {
        show.classList.add("show");
        pop_up_frame.style.visibility="visible";
        
    }    
    );

    var cancel_create = document.getElementById("cancel_create");
    cancel_create.addEventListener("click",()=> 
    {
        pop_up_frame.style.visibility="hidden";
        show.classList.remove("show");  
    }    
    );


    function pop_up_confirmation_on(description) {
        pop_up_background.style.visibility="visible";
        show.classList.add("show-yes-no"); 
        document.getElementById("pop_up_description").innerText=description;
    }
    function pop_up_confirmation_off() {
        pop_up_background.style.visibility="hidden";
        show.classList.remove("show-yes-no"); 
    }

    var no_btn = document.getElementById("no");
    no_btn.addEventListener("click",()=>
        {
        pop_up_confirmation_off();
        });
   
    

    var back = document.getElementById("back");

    back.addEventListener("click",show_side_bar);

    function hide_side_bar()
    {
        show.classList.add("move");
    }
    function show_side_bar()
    {
        show.classList.remove("move");
        Store_Title_List.Display();
    }

    function hide_add_task_input(value) {
        
        var add_task_input = document.getElementById("add_task");
            

            if(value=="completed" || value=="important")
            {
                add_task_input.style.visibility="hidden";
            }

            else
            {
                add_task_input.style.visibility="visible";
            }
    }

    function set_title_heading(title_heading_text)
    {
        document.getElementById("title_heading").innerText=title_heading_text;
        document.getElementById("title_heading").style.color="white";
    }


// title logo animation

    setInterval(Move,2000);
    function Move()
    {
        show.classList.toggle("logo");
    }
    

    
    // ------------------------------------------------------------------------

    //grid or list activation

    var list_button = document.getElementById("list_button");
    var grid_button = document.getElementById("grid_button");
    var back_movement_layer = document.getElementById("back_movement_layer");
    var title_list_show = document.getElementById("title_list_show");

    //list button active - add
    list_button.addEventListener("click",function(){

        var arr=[];

        var obj =
        {
            class_name:"list"
        };

        arr.push(obj);
        localStorage.setItem('Class_Name',JSON.stringify(arr));
        Class_Name_Check();
    });

    //grid button active - remove
    grid_button.addEventListener("click",function(){

        var arr=[];

        var obj =
        {
            class_name:""
        };
        
        arr.push(obj);
        localStorage.setItem('Class_Name',JSON.stringify(arr));
        Class_Name_Check();
    });

    function Class_Name_Check()
    {
        var Class_Name=[];
        Class_Name = JSON.parse(localStorage.getItem('Class_Name'));

        if(Class_Name[0].class_name=="list")
        {
    //console.log(Class_Name[0].class_name);
            back_movement_layer.classList.add("list");
            title_list_show.classList.add("list");
        
        }
        else
        {
            back_movement_layer.classList.remove("list");
            title_list_show.classList.remove("list");
        }
    
    }

    

    
    //-------------------------------------------------------------------------

class Store_Title_List{

    constructor(title_name,title_id)
    {
        this.title_name = title_name;
        this.title_id = title_id;
    }

    static Store_List(title_name_test="",title_name=""){

        if(!title_name_test && !title_name)
        {
            title_name_test = document.getElementById("title_name").value.trim(); 
            title_name = title_name_test.charAt(0).toUpperCase()+title_name_test.slice(1);
        }

        if(title_name=="")
        {
            return false;
        }
        else
        {
        var arr =[];
        var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_Title_List')) || [];

        if(localStorage.getItem('Store_Title_List')==null || stored_data.length==0)
        {
            var object_title_name = new Store_Title_List(title_name,1);
            arr.push(object_title_name);

            localStorage.setItem('Store_Title_List',JSON.stringify(arr));
        }
        else
        {   
            var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_Title_List')) || [];
            
            var title_id_ = stored_data[stored_data["length"]-1].title_id + 1;   
            //console.log(title_id_);
            var object_title_name = new Store_Title_List(title_name,title_id_);

            stored_data.push(object_title_name);
            localStorage.setItem('Store_Title_List',JSON.stringify(stored_data));
        }
        
        document.getElementById("title_name").value=""; 
        Store_Title_List.Display();
    }
    }

    static Display()
    {
        var title_list_show = document.getElementById("title_list_show");
        var stored_data=[];
        var display_content = "";

        if(localStorage.getItem('Store_Title_List')==null)
        {
            display_content = "";
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_Title_List'));

            for(let i=0; i<stored_data.length; i++)
            {  
                console.log(stored_data.length);
                var display_total_task= Store_Title_List.Display_Total_Task(stored_data[i].title_name);
                var display_completed_task=Store_Task.Display_Completed_Task_By_Title_Name(stored_data[i].title_name);
                var display_important_task = Store_Task.Display_Important_Task_By_Title_Name(stored_data[i].title_name);
                display_content+=`<div class="container-div" id="container_div" style="z-index:${200+stored_data.length-i};">
                    <div class="first" onclick='Store_Title_List.Show_Items("${stored_data[i].title_name}")'>
                    <i class="fas fa-th-large"></i>
                    <div class="info-detail">
                    <div class="info-list-name"><span>${stored_data[i].title_name}</span></div>
                    <div class="info_i_c_ic info-lmportant-count">
                    <div class="f"><i class="fas fa-star"> </i><span>Important</span></div>
                    <div class="s"><span>${display_important_task}</span></div>
                    </div>
                    <div class="info_i_c_ic info-completed-count">
                    <div class="f"><i class="fas fa-check-circle"> </i><span>Completed</span></div>
                    <div class="s"><span>${display_completed_task}</span></div>
                    </div>
                    <div class="info_i_c_ic info-incompleted-count">
                    <div class="f"><i class="fas fa-th-list"> </i><span>Incomplete</span></div>
                    <div class="s"><span>${display_total_task}</span></div>
                    </div>
                    </div> 
                    <span>${stored_data[i].title_name}</span>
                    </div>
                    <div class="second">
                    <span>${display_total_task}</span><i class="fas fa-trash" onclick='Store_Title_List.Delete_Title_Confirmation("${stored_data[i].title_id}","${stored_data[i].title_name}")' ></i>
                    </div>
                
                </div>`;
            }

            title_list_show.innerHTML=display_content;
            Store_Task.Display_Total_Important_Task();
            Store_Task.Display_Total_Completed_Task();
            

    }
}
    
    static Display_Total_Task(title_name)
    {
        var stored_data=[];
        var total_task_count = 0;

        if(localStorage.getItem('Store_New_Task')==null)
        {
            return 0;
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task'));;

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].title_name.toLowerCase()==title_name.toLowerCase())
                {
                    total_task_count=total_task_count+1;
                }
                
               }

               if(total_task_count==0)
               {
                total_task_count=0;
               }
                return total_task_count;
            
         }
    }

    static Show_Items(title_name)
    {
        hide_side_bar();
        hide_add_task_input("show");
        set_title_heading(title_name);
        Store_Task.Display(title_name);
        Store_Task.Display_Completed_Task(title_name);

    }


    static Delete_Title_Confirmation(id,title)
    {
        pop_up_confirmation_on("Selected List will be permanently deleted?");
        
        //var confirm_id = e.id;
        
        
        var yes_btn = document.getElementById("yes");

        yes_btn.addEventListener("click",()=>
        {
            
            Store_Title_List.Delete_Title(id,title);
            
            pop_up_confirmation_off();
       });
    }

    static Delete_Title(id,title)
    {
        var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_Title_List')) || [];
            
            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].title_id==id)
                {
                    stored_data.splice(i,1);
                }
            }
            Store_Task.Delete_Entire_Task_Containing_Title(title);
            localStorage.setItem('Store_Title_List',JSON.stringify(stored_data));
            Store_Title_List.Display();
    }


}


class Store_Task
{
    constructor(title_name,task,task_important,id)
    {
        this.title_name = title_name;
        this.task = task;
        this.task_important = task_important;
        this.id =id;
    }

    static Store_New_Task()
    {
        var task_input = document.getElementById("task_input").value; 
        var title_name = document.getElementById("title_heading").innerText;
    
        if(task_input=="")
        {
            return false;
        }
        else
        {

        var stored_data_check=[];
        stored_data_check = JSON.parse(localStorage.getItem('Store_New_Task')) || []; 
        var arr =[];

        if(localStorage.getItem('Store_New_Task')==null || stored_data_check.length==0)
        {
            var object_task = new Store_Task(title_name,task_input,1,1);
            arr.push(object_task);

            localStorage.setItem('Store_New_Task',JSON.stringify(arr));
        }
        else
        {
            
            var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task')) || [];
            
            var id_ = stored_data[stored_data["length"]-1].id + 1;
      
            var object_task = new Store_Task(title_name,task_input,0,id_);

            stored_data.push(object_task);
            localStorage.setItem('Store_New_Task',JSON.stringify(stored_data));
            
        }
        
        document.getElementById("task_input").value=""; 
        Store_Task.Display(title_name);
        }
    }

    static Display(title_name)
    {
        var task_list_show = document.getElementById("task_list_show");
        var stored_data=[];
        var display_content = "";
        var total_task_count = 0;


        if(localStorage.getItem('Store_New_Task')==null)
        {
            display_content = "";
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task'));;

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].title_name.toLowerCase()==title_name.toLowerCase())
                {
                    var task_important_value;
                    if(stored_data[i].task_important=="0")
                    {
                        task_important_value="far fa-star first-star";
            
                    }
                    else // style_color="color:rgb(223, 223, 223);"
                    {
                        task_important_value="fas fa-star second-star";
                    
                    }

                   
                    total_task_count=total_task_count+1;
                    display_content+=`<div class="container-div-list">
                    <div class="first">
                      <input type="checkbox"  id="check_box" onclick="Store_Task.Move_To_Completed(this,'${stored_data[i].id}')"/>
                      <label>${stored_data[i].task}</label>
                    </div>

                    <div class="second">
                        <i class="${task_important_value}" Onclick="Store_Task.Make_It_Important(this,${stored_data[i].id})" id="new"></i>
                        <i class="fas fa-trash" Onclick="Store_Task.Delete_Confirmation(this ,'${stored_data[i].id}') " id="new"></i>
                    </div>
                </div> `;
                }
                
               }

               if(total_task_count==0)
               {
                display_content="";
               }
               task_list_show.innerHTML=display_content;
               document.getElementById("total_task").innerText = total_task_count;
               hide_add_task_input("visible");
         }
    }

    

    static Delete_Confirmation(e,id)
    {
        pop_up_confirmation_on("Are you sure to remove the following task?")
        
        var confirm_id = e.id;
        
        
        var yes_btn = document.getElementById("yes");

        yes_btn.addEventListener("click",()=>
        {
            if(confirm_id=="new")
            {
                //console.log(confirm_id);
            Store_Task.Delete_Task(id);
            }
            else
            {
                //console.log(confirm_id);
            Store_Task.Delete_Completed_Task(id);
            }
            pop_up_confirmation_off();
       })
    }

    static Delete_Task(id)
    {

            var title_name = document.getElementById("title_heading").innerText;
            var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task')) || [];
            
            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].id==id)
                {
                    stored_data.splice(i,1);
                }
            }

            localStorage.setItem('Store_New_Task',JSON.stringify(stored_data));
             Store_Task.Display(title_name);
            
           

        

    }

    static Delete_Entire_Task_Containing_Title(title)
    {
        var stored_data=[];
        stored_data = JSON.parse(localStorage.getItem('Store_New_Task')) || [];
        
        for(let i=0; i<stored_data.length; i++)
        {
            if(stored_data[i].title_name==title)
            {
                
                stored_data.splice(i,1);
                
                i=-1;
            }
        }

        localStorage.setItem('Store_New_Task',JSON.stringify(stored_data));
    }




    

    static Move_To_Completed(e,id)
    {   
        var title_name = document.getElementById("title_heading").innerText;
        var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task')) || [];
        
            
            var stored_completed_data=[];
            stored_completed_data = JSON.parse(localStorage.getItem('Completed')) || [];
        if(localStorage.getItem('Completed')==null || stored_completed_data.length==0)
        {
            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].id==id)
                {

                   var object_task = new Store_Task(stored_data[i].title_name,stored_data[i].task,stored_data[i].task_important,1);
                   stored_completed_data.push(object_task);
       
                   localStorage.setItem('Completed',JSON.stringify(stored_completed_data));
                   //console.log(e.id);
                //    Store_Task.Delete_Task(id);
                //    Store_Task.Display_Completed_Task(title_name);
                 }
            }
        }
        else{  

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].id==id)
                {
                    var id_ = stored_completed_data[stored_completed_data["length"]-1].id + 1;
        
                    var object_task = new Store_Task(stored_data[i].title_name,stored_data[i].task,stored_data[i].task_important,id_);
                    stored_completed_data.push(object_task);
       
                    localStorage.setItem('Completed',JSON.stringify(stored_completed_data));
                //    Store_Task.Delete_Task(id);
                //    Store_Task.Display_Completed_Task(title_name);
                 }
            }
        }

        if(e.id=="check_box")
        {
            Store_Task.Delete_Task(id);
            Store_Task.Display_Completed_Task(title_name);
            
            
        }
        else{
            Store_Task.Delete_Task(id);
            Store_Task.Display_Important_Task();
           
        }
            
    }

    static Delete_Completed_Task(id)
    {
        var title_name = document.getElementById("title_heading").innerText;
        var stored_completed_data=[];
        stored_completed_data  = JSON.parse(localStorage.getItem('Completed')) || [];
            
            for(let i=0; i<stored_completed_data.length; i++)
            {
                if(stored_completed_data[i].id==id)
                {
                    stored_completed_data.splice(i,1);
                }
            }

            localStorage.setItem('Completed',JSON.stringify(stored_completed_data));
            console.log(title_name);

            if(title_name.trim()=="Completed")
            {
                Store_Task.create_Element_ul_li_completed();
            }
            else
            {
            Store_Task.Display_Completed_Task(title_name);
            
            }
            
        }

    static Move_To_New_Task(id,check)
    {   
        //console.log(check);
        var title_name = document.getElementById("title_heading").innerText;
        var stored_completed_data=[];
        stored_completed_data = JSON.parse(localStorage.getItem('Completed')) || [];
        
            
            var stored_data=[];
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task')) || [];
           
            if(localStorage.getItem('Store_New_Task')==null || stored_data.length==0)
            {
                for(let i=0; i<stored_completed_data.length; i++)
                {
                if(stored_completed_data[i].id==id)
                    {
                   var object_task = new Store_Task(stored_completed_data[i].title_name,stored_completed_data[i].task,stored_completed_data[i].task_important,1);
                   stored_data.push(object_task);
       
                   localStorage.setItem('Store_New_Task',JSON.stringify(stored_data));
                   Store_Task.Delete_Completed_Task(id)
                   Store_Task.Display_Total_Important_Task();
                   Store_Task.Display_Total_Completed_Task();
                   if(check=="COnly")
                   {
                    Store_Task.Display(title_name);
                   }
                   else
                   {
                    Store_Task.create_Element_ul_li_completed();
                   }
                   
                   
                    }
                }
            }
            else
            {
                for(let i=0; i<stored_completed_data.length; i++)
                {
                if(stored_completed_data[i].id==id)
                    {
                    var id_ = stored_data[stored_data["length"]-1].id + 1;
                    var object_task = new Store_Task(stored_completed_data[i].title_name,stored_completed_data[i].task,stored_completed_data[i].task_important,id_);
                    stored_data.push(object_task);
       
                    localStorage.setItem('Store_New_Task',JSON.stringify(stored_data));
                    Store_Task.Delete_Completed_Task(id)
                    
                    if(check=="COnly")
                    {
                       // console.log(check);
                     Store_Task.Display(title_name);
                    }
                    else
                    {
                        //console.log(check);
                     Store_Task.create_Element_ul_li_completed();
                    }
                }
                }
             }
            
    }
        
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //  displaying total completed task by title name for info-details
    
    static Display_Completed_Task_By_Title_Name(title_name)
    {
        var stored_data=[];
        var total_task_count = 0;


        if(localStorage.getItem('Completed')==null)
        {
            return 0;
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Completed'));

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].title_name==title_name)
                {
                    total_task_count=total_task_count+1;
                }
                }
                
        }

        return total_task_count;
    }

 //  displaying total important task by title name for info-details

 static Display_Important_Task_By_Title_Name(title_name)
    {
        var stored_data=[];
        var total_task_count = 0;


        if(localStorage.getItem('Store_New_Task')==null)
        {
            return 0;
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task'));

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].title_name==title_name)
                {   
                    if(stored_data[i].task_important==1)
                    {
                    total_task_count=total_task_count+1;
                    }
                }
            }
                
        }

        return total_task_count;
    }

    //finished
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    static Display_Completed_Task(title_name)
    {
    
        var stored_completed_data=[];
        var display_completed_content;
        display_completed_content = "";
        var completed_task_count=0;
        
        var details = document.getElementById("details");
        var div = document.getElementById("completed_task_list_show");

        

        if(localStorage.getItem('Completed')==null)
        {
            display_completed_content = "";
            completed_task_count=0;
            
        }
        else
        {
            stored_completed_data = JSON.parse(localStorage.getItem('Completed'));

            for(let i=0; i<stored_completed_data.length; i++)
            {
                if(stored_completed_data[i].title_name.toLowerCase()==title_name.toLowerCase())
                {
                    var task_important_value;
                    if(stored_completed_data[i].task_important=="0")
                    {
                        task_important_value="far fa-star first-star";
                    }
                    else
                    {
                        task_important_value="fas fa-star second-star";
                    }
                    completed_task_count=completed_task_count+1;
                    display_completed_content+=`<div class="container-div-list">
                    <div class="first">
                      <input type="checkbox"  id="check_box_complete" onclick="Store_Task.Move_To_New_Task(${stored_completed_data[i].id},'COnly')"  checked/>
                      <label>${stored_completed_data[i].task}</label>
                    </div>

                    <div class="second">    
                        <i class="${task_important_value}" Onclick="Store_Task.Make_It_Important(this,${stored_completed_data[i].id})" id="completed"></i>
                        <i class="fas fa-trash" Onclick="Store_Task.Delete_Confirmation(this,'${stored_completed_data[i].id}')" id="completed"></i>
                    </div>
                </div> `;
                } 
            }

            
            
               
         }

         if(completed_task_count==0)
            {
                details.style.display = "none";
            }
            else
            {   
               
                div.innerHTML = display_completed_content;
                
                document.getElementById("total_completed").innerText = completed_task_count;
                details.style.display = "";
                //Store_Task.Display_Total_Completed_Task();
             }
    }

    
    static Display_Total_Completed_Task()
    {
        var total_completed_task = document.getElementById("total_completed_task");
        var stored_data=[];
        var total_task_count = 0;


        if(localStorage.getItem('Completed')==null)
        {
            return 0;
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Completed'));

            for(let i=0; i<stored_data.length; i++)
            {
                
                    total_task_count=total_task_count+1;
            }
                
            }

               if(total_task_count==0)
               {
                total_task_count=0;
               }
               total_completed_task.innerText=total_task_count;
               document.getElementById("total_task").innerText = total_task_count;
            
    }
    
    

    static Make_It_Important(e,id)
    {
        var title_name = document.getElementById("title_heading").innerText; 

        var store_data =[];
        store_data=(e.id=="new"|| e.id=="import_tant")?JSON.parse(localStorage.getItem("Store_New_Task")):JSON.parse(localStorage.getItem("Completed"));

        //console.log(store_data);

        for(let i=0; i<store_data.length;i++)
        {
            if(store_data[i].id==id)
            {
                if(store_data[i].task_important==0)
                {
                    store_data[i].task_important=1;
                }
                else
                {
                    store_data[i].task_important=0;
                }
                break;
            }
        }

        if(e.id=="new")
        {
            localStorage.setItem("Store_New_Task", JSON.stringify(store_data));
            Store_Task.Display(title_name);
        }
        else if(e.id=="import_tant")
        {
            localStorage.setItem("Store_New_Task", JSON.stringify(store_data));
            Store_Task.Display_Important_Task();
        }
        else
        {
            localStorage.setItem("Completed", JSON.stringify(store_data));
            Store_Task.Display_Completed_Task(title_name);
        }
    }

    static Display_Important_Task()
    {
        var stored_data=[];
        var total_task_count=0;
        var display_content="";

        if(localStorage.getItem('Store_New_Task')==null)
        {
            display_content = "";
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task'));
            
            for(let i=0;i<stored_data.length; i++)
            {
                if(stored_data[i].task_important=="1")
                {
                        
                        total_task_count=total_task_count+1;
                        display_content+=`<div class="container-div-list">
                        <div class="first" style="padding:0px; margin:0px;">
    
                          <input type="checkbox"  id="check_box_import" onclick="Store_Task.Move_To_Completed(this,'${stored_data[i].id}')"/>
                          <div style="display:flex; flex-direction:column; ">  
                          <label style="margin:0px; padding:0px; padding-top:4px;">${stored_data[i].task}</label>
                          <label style=" padding-bottom:3px; margin:0px; margin-bottom:2px; font-size:13px; color:rgba(172, 255, 47, 0.671);">${stored_data[i].title_name}</label>
                            </div>
                        </div>
    
                        <div class="second" style="display-flex; padding-left:80px;">
                           
                                <i class="fas fa-star second-star"  Onclick="Store_Task.Make_It_Important(this,${stored_data[i].id})" id="import_tant"></i>

                            
                        </div>
                    </div> `;
                }
                    
            }
            task_list_show.innerHTML=display_content;
            document.getElementById("total_task").innerText = total_task_count;
            Store_Task.Display_Total_Important_Task();
            //Store_Task.Display_Total_Completed_Task();
        }
    }



    static Display_Important()
    {
        
        var details = document.getElementById("details");
        details.style.display="none";
        
        hide_add_task_input("important");

        if(localStorage.getItem('Store_New_Task')==null)
        {
            return false; 
        }
        else
        {
            Store_Task.Display_Important_Task();
            hide_side_bar();
            var add_task_input = document.getElementById("add_task");
            add_task_input.style.visibility="hidden";
            
            var title_heading=document.getElementById("title_heading");
            title_heading.innerHTML=`<i class="fas fa-star"></i> Important`;
            title_heading.style.color="rgb(153, 255, 0)";
        }

       
            
        
    }

    static Display_Total_Important_Task()
    {
        var total_important_task = document.getElementById("total_important_task");
        var stored_data=[];
        var total_task_count = 0;


        if(localStorage.getItem('Store_New_Task')==null)
        {
            return 0;
        }
        else
        {
            stored_data = JSON.parse(localStorage.getItem('Store_New_Task'));

            for(let i=0; i<stored_data.length; i++)
            {
                if(stored_data[i].task_important=="1")
                {
                    total_task_count=total_task_count+1;
                }
                
               }

               if(total_task_count==0)
               {
                total_task_count=0;
               }
               total_important_task.innerText=total_task_count;
            
         }
    }


    static Display_All_Competed_Task()
    {
        var details = document.getElementById("details");
        details.style.display="none";
        
        hide_add_task_input("completed");

        if(localStorage.getItem('Completed')==null)
        {
            return false; 
        }
        else
        {
            Store_Task.create_Element_ul_li_completed();
            hide_side_bar();
            var title_heading=document.getElementById("title_heading");
            title_heading.innerHTML=`<i class="fas fa-check-circle"></i> Completed`;
            title_heading.style.color="rgb(255, 61, 61)";
        }

       
    }

   static create_Element_ul_li_completed(){


        task_list_show.innerHTML="";
        Store_Task.Display_Total_Completed_Task();
        var stored_data = [];
        stored_data = JSON.parse(localStorage.getItem('Completed'));
        if(localStorage.getItem('Completed')==null || stored_data.length==0)
        {
            return false; 
        }
        else
        {
        stored_data.sort((a,b)=> {
            // return a[property].localeCompare(b[property]);
             return a.title_name.localeCompare(b.title_name);
         });
        var title_temp = stored_data[0].title_name;

        var total_completed = 0;
        
       
   
        var details = document.createElement("details");
        details.setAttribute("open","open");
        var ul = document.createElement("ul");
              
        

        for(var i=0; i<stored_data.length; i++)
        {   
            
            if(stored_data[i].title_name==title_temp)
            {   
                total_completed+=1;
                var li = document.createElement("li");
                
                //li.appendChild(document.createTextNode(stored_data[i].task));
                li.innerHTML=`<div class="container-div-list">
                <div class="first">

                  <input type="checkbox"  id="check_box_complete" onclick="Store_Task.Move_To_New_Task(${stored_data[i].id},'CAll')"  checked/>
                  <label>${stored_data[i].task}</label>

                </div>

                <div class="second">
                   
                        <i class="" Onclick="Store_Task.Make_It_Important(this,${stored_data[i].id})" id="completed"></i>
                    
                        <i class="fas fa-trash" Onclick="Store_Task.Delete_Confirmation(this,'${stored_data[i].id}')" id="completed"></i>
                    
                </div>
            </div> `;
                ul.appendChild(li);
                
                details.innerHTML=`<summary>${stored_data[i].title_name}  ${total_completed} </summary>`;
                details.appendChild(ul);
                // container.appendChild(head_);
                task_list_show.appendChild(details);
                title_temp = stored_data[i].title_name;
               

            }
            else
            {                  
                total_completed=1;
                var details = document.createElement("details");
                details.setAttribute("open","open");
                var ul = document.createElement("ul");
                var li = document.createElement("li");

                li.innerHTML=`<div class="container-div-list">
                <div class="first">

                  <input type="checkbox"  id="check_box_complete" onclick="Store_Task.Move_To_New_Task(${stored_data[i].id},'CAll')"  checked/>
                  <label>${stored_data[i].task}</label>

                </div>

                <div class="second">
                   
                        <i class="" Onclick="Store_Task.Make_It_Important(this,${stored_data[i].id})" id="completed"></i>
                    
                        <i class="fas fa-trash" Onclick="Store_Task.Delete_Confirmation(this,'${stored_data[i].id}')" id="completed"></i>
                    
                </div>
            </div> `;
                ul.appendChild(li);
                
                details.innerHTML=`<summary>${stored_data[i].title_name}  ${total_completed}</summary>`;
                details.appendChild(ul);
                
                task_list_show.appendChild(details);
                title_temp = stored_data[i].title_name;
            }
        }

    }
   
}
}
    //important div click eventlistener

    var important = document.getElementById("important");

    important.addEventListener("click",()=>Store_Task.Display_Important());


    //completed div click evetlistener

    var completed_task = document.getElementById("completed");

    completed_task.addEventListener("click",()=>Store_Task.Display_All_Competed_Task());


    var create_title = document.getElementById("create");
    var title_name_test = document.getElementById("title_name");
    
    create_title.addEventListener("click",()=>Store_Title_List.Store_List());
    title_name_test.addEventListener("keyup",function(event){

        if(event.keyCode===13)
        {
            event.preventDefault();
            Store_Title_List.Store_List();
        }

    })

    var task_input = document.getElementById("task_input");
    
    task_input.addEventListener("keyup",function(event){

        if(event.keyCode===13)
        {
            event.preventDefault();
            Store_Task.Store_New_Task();
        }

    })
    
    Class_Name_Check();
    Store_Title_List.Display();
    