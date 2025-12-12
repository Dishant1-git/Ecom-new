#include<stdio.h>
#include<conio.h>
    int *p1,*p2,*p3;
	int i=1;
	int j=2;
	int a[5]={1,2,3,4,5};
int main()
{
    int m,n,x;
    p1=&i;
    p2=&j;
    p3=&a[0];
    m=*p1-*p2;
    n=*p1+*p2;
    x=*p3+2;
    if(*p1>=*p2)
    printf("%d\n%d\n%d",m,n,x);
    if(*p1<=*p2)
    printf("%u\n%u\n%u",p1,p2,p3);
    
	

	return 0;
}
