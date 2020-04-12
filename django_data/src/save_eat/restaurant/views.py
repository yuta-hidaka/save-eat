from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from . import forms
from django.http import Http404
from .models import Restaurant
import json
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder


def IndexView(request):
    return render(request, 'restaurant/index.html')


def SerchView(request):
    return render(request, 'restaurant/search.html')

def HistoryView(request):
    return render(request, 'restaurant/history.html')

def EditView(request):
    return render(request, 'restaurant/edit.html')

def RestaurantDetailView(request, restaurant_id):
    try:
        data = Restaurant.objects.filter(pk=restaurant_id).values().first()
    except Restaurant.DoesNotExist:
        raise Http404("存在しないデータです。")
    json_string = json.dumps(data, cls=DjangoJSONEncoder)
    return render(request, 'restaurant/detail.html', {'data': json_string})


def RegisterView(request):
    form = forms.RestaurantForm()
    d = {
        'form': form,
        'message': '',
    }
    if request.method == "POST":
        form = forms.RestaurantForm(request.POST, request.FILES)
        message = '登録に失敗しました。'
        d = {
            'form': form,
            'message': message,
        }
        if form.is_valid():
            post = form.save(commit=False)
            try:
                post.user = request.user
                form = post.save()
                pass
            except:
                return render(request, 'restaurant/register.html', d)
                pass
        return render(request, 'restaurant/register_compleate.html')

    else:
        form = forms.RestaurantForm()

    return render(request, 'restaurant/register.html', d)


# def detail_view(request, id):
#     # dictionary for initial data with
#     # field names as keys
#     context = {}

#     # add the dictionary during initialization
#     context["data"] = GeeksModel.objects.get(id=id)

#     return render(request, "detail_view.html", context)

# # update view for details


# def update_view(request, id):
#     # dictionary for initial data with
#     # field names as keys
#     context = {}

#     # fetch the object related to passed id
#     obj = get_object_or_404(GeeksModel, id=id)

#     # pass the object as instance in form
#     form = GeeksForm(request.POST or None, instance=obj)

#     # save the data from the form and
#     # redirect to detail_view
#     if form.is_valid():
#         form.save()
#         return HttpResponseRedirect("/"+id)

#     # add form dictionary to context
#     context["form"] = form

#     return render(request, "update_view.html", context)
