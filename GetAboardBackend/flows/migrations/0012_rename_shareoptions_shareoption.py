# Generated by Django 5.0.1 on 2024-03-13 21:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flows', '0011_shareoptions'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ShareOptions',
            new_name='ShareOption',
        ),
    ]
