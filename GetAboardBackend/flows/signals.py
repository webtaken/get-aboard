from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Flow, Node


@receiver(post_save, sender=Flow)
def after_flow_created(sender, instance: Flow, created, **kwargs):
    if created:
        flow_map = instance.nodes_map

        title = flow_map[0]["data"]["title"]
        description = "<h2>(Step 1) Welcome and orientation</h2><ul><li><p>Meet the team and key stakeholders.</p></li><li><p>Introduction to the company culture and values.</p></li><li><p>Overview of the project(s) they will be working on.</p></li><li><p>Set up workspace, including hardware and software.</p></li></ul>"
        welcome_node = create_node(instance, title, description)

        title = flow_map[1]["data"]["title"]
        description = "<h2>(Step 2) Access and Tools</h2><ul><li><p>Obtain necessary access to repositories, project management tools, communication channels, and any other necessary software.</p></li><li><p>Introduction to the development environment and setup instructions.</p></li><li><p>Familiarization with version control (e.g., Git workflows).</p></li></ul>"
        access_node = create_node(instance, title, description)

        title = flow_map[2]["data"]["title"]
        description = "<h2>(Step 3) Company Processes and Policies</h2><ul><li><p>Overview of company policies (e.g., security, confidentiality, code of conduct).</p></li><li><p>Introduction to the development process (e.g., Agile, Scrum).</p></li><li><p>Review of the code review process and coding standards.</p></li></ul>"
        processes_node = create_node(instance, title, description)

        title = flow_map[3]["data"]["title"]
        description = "<h2>(Step 4) Codebase and Documentation</h2><ul><li><p>Overview of the codebase structure and key components.</p></li><li><p>Introduction to the documentation (e.g., project documentation, technical documentation).</p></li><li><p>Start exploring the codebase with guidance from a mentor or senior developer.</p></li></ul>"
        codebase_node = create_node(instance, title, description)

        title = flow_map[4]["data"]["title"]
        description = "<h2>(Step 5) Initial Tasks and Small Fixes</h2><ul><li><p>Assign small, non-critical tasks or bug fixes to help the new developer get hands-on experience with the codebase.</p></li><li><p>Pair programming with a mentor to understand coding standards and practices.</p></li></ul>"
        tasks_node = create_node(instance, title, description)

        # Update nodes ids on flow map
        instance.nodes_map[0]["data"]["idOnDB"] = welcome_node.node_id
        instance.nodes_map[1]["data"]["idOnDB"] = access_node.node_id
        instance.nodes_map[2]["data"]["idOnDB"] = processes_node.node_id
        instance.nodes_map[3]["data"]["idOnDB"] = codebase_node.node_id
        instance.nodes_map[4]["data"]["idOnDB"] = tasks_node.node_id
        instance.save()


def create_node(flow: Flow, title, description):
    node = Node(flow=flow, title=title, description=description)
    node.save()
    print(f"Created default node: {node} for flow {flow}")
    return node
