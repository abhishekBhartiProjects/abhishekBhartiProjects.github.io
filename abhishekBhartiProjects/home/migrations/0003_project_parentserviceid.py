# Generated by Django 2.1 on 2019-04-30 21:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='parentServiceId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.Service'),
        ),
    ]
