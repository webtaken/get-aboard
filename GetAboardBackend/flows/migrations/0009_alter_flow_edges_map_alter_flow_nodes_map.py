# Generated by Django 5.0.1 on 2024-03-01 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flows', '0008_rename_edges_flow_edges_map_flow_nodes_map'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flow',
            name='edges_map',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='flow',
            name='nodes_map',
            field=models.JSONField(default=list),
        ),
    ]
