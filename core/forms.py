from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'placeholder': 'John Doe'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'john@example.com'}))
    subject = forms.CharField(max_length=200, widget=forms.TextInput(attrs={'placeholder': 'How can I help you?'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'rows': 6, 'placeholder': 'Your message here...'}))
