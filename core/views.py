from django.http.response import HttpResponse
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import ContactForm
from blog.models import Post
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import json
from django.conf import settings
from django.views.decorators.http import require_http_methods
import ssl

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = "vaibhavrajsinha099@gmail.com"
# app_password = "qmha uuyf pljw oogh"
app_password = "ndfq zxul cbkr igdb"
receiver_email = "vedansh.sahay2023@vitstudent.ac.in"
# receiver_email = "aryamankocchar456@gmail.com"




def frontpage(request):
    posts = Post.objects.filter(status=Post.ACTIVE)

    return render(request, 'core/frontpage.html', {'posts': posts})

def about(request):
    return render(request, 'core/about.html')

def robots_txt(request):
    text = [
        "User-Agent: *",
        "Disallow: /admin/",
    ]
    return HttpResponse("\n".join(text), content_type="text/plain")

def portfolio(request):
    return render(request, 'core/index.html')


def contact(request):
    form = ContactForm()

    return render(request, 'core/index.html', {'form': form})

@csrf_exempt  # This disables CSRF protection for this view
def handle_form_submission(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')

            # Print to terminal
            print(f"Name: {name}")
            print(f"Email: {email}")
            print(f"Subject: {subject}")
            print(f"Message: {message}")

            message = f"""
                        Name: {name}
                        Subject: {subject} 
                        Email: {email}
                        Message: {message}
                        """


            # Sending the email
            try:
                context = ssl.create_default_context()
                with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
                    server.login(sender_email, app_password)
                    server.sendmail(sender_email, receiver_email, message)
                print("Email sent successfully!")
            except Exception as e:
                print(f"Error: {e}")

            return JsonResponse({'status': 'success', 'message': 'Form submitted successfully!'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)