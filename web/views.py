from django.shortcuts import render
import pandas as pd
import numpy as np
from django.conf import settings
# Create your views here.

def base(request):
    
    return render(request , 'web/base.html')

def search(request):
    if request.method == 'POST':
        excel_file = pd.read_excel(settings.BASE_DIR/'Test_Sheet.xlsx')
        status=""
        content=""
        num = request.POST.get('number')
        number_col = excel_file['Mobile_Number']
        ind=-1
        for i in range(len(number_col)):
            try:
                c=str((int)(number_col[i]))
                if (num) == c:

                    ind = i
            except :
                print("Exception")
            
        if(ind==-1):
            status="Number not found"
        else:
            status = excel_file['Status'][ind]
        context = {'status':status, 'content':content , 'num':num}

    return render(request , 'web/search.html' , context)

def add(request):
    if request.method == 'POST':
        return render(request , 'web/add.html')   
    return render(request , 'web/add.html')