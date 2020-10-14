var arrsize=document.getElementById('a');
var size=(document.getElementById('a')).value;
var sortspeed=document.getElementById('b');
var speed=sortspeed.value;
var divsize=[];
var div=[];
var cont=document.getElementById("plot");
var del;
var buttons=document.getElementsByClassName("yo");
var array_size=size;

var dummy=100;

function generate()
{
	cont.innerHTML="";
	size=(arrsize).value;
	switch(speed)
	{
		case 1:
		dummy=1;
		break;
		case 2:
		dummy=10;
		break;
		case 3:
		dummy=100;
		break;
		case 4:
		dummy=1000;
		break;
		case 5:
		dummy=10000;
		break;
	}
	for(i=0;i<size;i++)
	{
		divsize[i]=Math.floor((Math.random())*99)+1;
		div[i]=document.createElement("div");
		cont.appendChild(div[i]);
		div[i].style.backgroundColor="rgb(255, 0, 128)";
		div[i].style.margin="0% "+0.1+"% auto "+0.1+"%";
		div[i].style.height=divsize[i]+"%";
		div[i].style.width=((100/size)-0.2)+"%";
	}
}

window.onload=generate();

var time=0;
del=10000/(Math.floor(size/10)*dummy);

function enable_buttons(){
	window.setTimeout(function(){
	for(i=0;i<buttons.length;i++)
	{
		buttons[i].disabled=false;
	}},time+=del);
}

function disable_buttons(){
	for(i=0;i<buttons.length;i++)
	{
		buttons[i].disabled=true;
	}
}

function div_update(a,b,c){
	window.setTimeout(function(){
		a.style.height=b+"%";
		a.style.backgroundColor=" "+c;
	},time+=del);
}

function Bubble(element)
{
    element.classList.add("change");
    time=0;
    disable_buttons();
    var i,j;

    for(var i=0;i<size-1;i++)
    {
        for(var j=0;j<size-i-1;j++)
        {
            div_update(div[j],divsize[j],"rgb(0, 255, 255)");

            if(divsize[j]>divsize[j+1])
            {
                div_update(div[j],divsize[j], "rgb(191, 0, 255)");
                div_update(div[j+1],divsize[j+1],"rgb(191, 0, 255)");

                var temp=divsize[j];
                divsize[j]=divsize[j+1];
                divsize[j+1]=temp;

                div_update(div[j],divsize[j], "rgb(191, 0, 255)");
                div_update(div[j+1],divsize[j+1], "rgb(191, 0, 255)");
            }
            div_update(div[j],divsize[j], "rgb(255, 0, 128)");
        }
        div_update(div[j],divsize[j], "rgb(0, 255, 0)");
    }
    div_update(div[0],divsize[0], "rgb(0, 255, 0)");

    enable_buttons();
}

/*----------------------------------------------------------------------------------------*/

function Heap()
{
    c_delay=0;

    heap_sort();
    
    enable_buttons();
}

function swap(i,j)
{
    div_update(div[i],divsize[i],"red");//Color update
    div_update(div[j],divsize[j],"red");//Color update

    var temp=divsize[i];
    divsize[i]=divsize[j];
    divsize[j]=temp;

    div_update(div[i],divsize[i],"red");//Height update
    div_update(div[j],divsize[j],"red");//Height update

    div_update(div[i],divsize[i],"blue");//Color update
    div_update(div[j],divsize[j],"blue");//Color update
}

function max_heapify(n,i)
{
    var largest=i;
    var l=2*i+1;
    var r=2*i+2;

    if(l<n && divsize[l]>divsize[largest])
    {
        if(largest!=i)
        {
            div_update(div[largest],divsize[largest],"blue");//Color update
        }

        largest=l;

        div_update(div[largest],divsize[largest],"red");//Color update
    }

    if(r<n && divsize[r]>divsize[largest])
    {
        if(largest!=i)
        {
            div_update(div[largest],divsize[largest],"blue");//Color update
        }

        largest=r;

        div_update(div[largest],divsize[largest],"red");//Color update
    }

    if(largest!=i)
    {
        swap(i,largest);

        max_heapify(n,largest);
    }
}

function heap_sort()
{
    for(var i=Math.floor(array_size/2)-1;i>=0;i--)
    {
        max_heapify(array_size,i);
    }

    for(var i=array_size-1;i>0;i--)
    {
        swap(0,i);
        div_update(div[i],divsize[i],"green");//Color update
        div_update(div[i],divsize[i],"yellow");//Color update

        max_heapify(i,0);

        div_update(div[i],divsize[i],"blue");//Color update
        div_update(div[i],divsize[i],"green");//Color update
    }
    div_update(div[i],divsize[i],"green");//Color update
}

/*----------------------------------------------------------------------------------------*/

function Insertion()
{
    c_delay=0;

    for(var j=0;j<array_size;j++)
    {
        div_update(div[j],divsize[j],"yellow");//Color update

        var key= divsize[j];
        var i=j-1;
        while(i>=0 && divsize[i]>key)
        {
            div_update(div[i],divsize[i],"red");//Color update
            div_update(div[i+1],divsize[i+1],"red");//Color update

            divsize[i+1]=divsize[i];

            div_update(div[i],divsize[i],"red");//Height update
            div_update(div[i+1],divsize[i+1],"red");//Height update
    
            div_update(div[i],divsize[i],"blue");//Color update
            if(i==(j-1))
            {
                div_update(div[i+1],divsize[i+1],"yellow");//Color update
            }
            else
            {
                div_update(div[i+1],divsize[i+1],"blue");//Color update
            }
            i-=1;
        }
        divsize[i+1]=key;

        for(var t=0;t<j;t++)
        {
            div_update(div[t],divsize[t],"green");//Color update
        }
    }
    div_update(div[j-1],divsize[j-1],"green");//Color update

    enable_buttons();
}

/*----------------------------------------------------------------------------------------*/

function Merge()
{
    c_delay=0;

    merge_partition(0,array_size-1);

    enable_buttons();
}

function merge_sort(start,mid,end)
{
    var p=start,q=mid+1;

    var Arr=[],k=0;

    for(var i=start; i<=end; i++)
    {
        if(p>mid)
        {
            Arr[k++]=divsize[q++];
            div_update(div[q-1],divsize[q-1],"red");//Color update
        }
        else if(q>end)
        {
            Arr[k++]=divsize[p++];
            div_update(div[p-1],divsize[p-1],"red");//Color update
        }
        else if(divsize[p]<divsize[q])
        {
            Arr[k++]=divsize[p++];
            div_update(div[p-1],divsize[p-1],"red");//Color update
        }
        else
        {
            Arr[k++]=divsize[q++];
            div_update(div[q-1],divsize[q-1],"red");//Color update
        }
    }

    for(var t=0;t<k;t++)
    {
        divsize[start++]=Arr[t];
        div_update(div[start-1],divsize[start-1],"green");//Color update
    }
}

function merge_partition(start,end)
{
    if(start < end)
    {
        var mid=Math.floor((start + end) / 2);
        div_update(div[mid],divsize[mid],"yellow");//Color update

        merge_partition(start,mid);
        merge_partition(mid+1,end);

        merge_sort(start,mid,end);
    }
}

/*----------------------------------------------------------------------------------------*/

function Quick()
{
    c_delay=0;

    quick_sort(0,array_size-1);

    enable_buttons();
}

function quick_partition (start, end)
{
    var i = start + 1;
    var piv = divsize[start] ;//make the first element as pivot element.
    div_update(div[start],divsize[start],"yellow");//Color update

        for(var j =start + 1; j <= end ; j++ )
        {
            //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
            if (div_sizes[ j ] < piv)
            {
                div_update(div[j],divsize[j],"yellow");//Color update

                div_update(div[i],divsize[i],"red");//Color update
                div_update(div[j],divsize[j],"red");//Color update

                var temp=divsize[i];
                divsize[i]=divsize[j];
                divsize[j]=temp;

                div_update(div[i],divsize[i],"red");//Height update
                div_update(div[j],divsize[j],"red");//Height update

                div_update(div[i],divsize[i],"blue");//Height update
                div_update(div[j],divsize[j],"blue");//Height update

                i += 1;
            }
    }
    div_update(div[start],divsize[start],"red");//Color update
    div_update(div[i-1],divsize[i-1],"red");//Color update
    
    var temp=divsize[start];//put the pivot element in its proper place.
    divsize[start]=divsize[i-1];
    divsize[i-1]=temp;

    div_update(div[start],divsize[start],"red");//Height update
    div_update(div[i-1],divsize[i-1],"red");//Height update

    for(var t=start;t<=i;t++)
    {
        div_update(div[t],divsize[t],"green");//Color update
    }

    return i-1;//return the position of the pivot
}

function quick_sort (start, end )
{
    if( start < end )
    {
        //stores the position of pivot element
        var piv_pos = quick_partition (start, end ) ;     
        quick_sort (start, piv_pos -1);//sorts the left side of pivot.
        quick_sort (piv_pos +1, end) ;//sorts the right side of pivot.
    }
 }

/*----------------------------------------------------------------------------------------*/

function Selection()
{
    c_delay=0;

    for(var i=0;i<array_size-1;i++)
    {
        div_update(div[i],divsize[i],"red");//Color update

        index_min=i;

        for(var j=i+1;j<array_size;j++)
        {
            div_update(div[j],divsize[j],"yellow");//Color update

            if(divsize[j]<divsize[index_min])
            {
                if(index_min!=i)
                {
                    div_update(div[index_min],divsize[index_min],"blue");//Color update
                }
                index_min=j;
                div_update(div[index_min],divsize[index_min],"red");//Color update
            }
            else
            {
                div_update(div[j],divsize[j],"blue");//Color update
            }
        }
        
        if(index_min!=i)
        {
            var temp=divsize[index_min];
            divsize[index_min]=divsize[i];
            divsize[i]=temp;

            div_update(div[index_min],divsize[index_min],"red");//Height update
            div_update(div[i],divsize[i],"red");//Height update
            div_update(div[index_min],divsize[index_min],"blue");//Color update
        }
        div_update(div[i],divsize[i],"green");//Color update
    }
    div_update(div[i],divsize[i],"green");//Color update

    enable_buttons();
}

/*----------------------------------------------------------------------------------------*/
	