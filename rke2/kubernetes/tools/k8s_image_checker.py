import kubernetes.client
from kubernetes.client import ApiClient, Configuration
from kubernetes.client.rest import ApiException
from kubernetes import config
import docker
from docker.errors import DockerException

def get_k8s_client():
    config.load_kube_config()
    return kubernetes.client.CoreV1Api()

def get_docker_client():
    return docker.from_env()

def get_all_pods(api):
    try:
        return api.list_pod_for_all_namespaces(watch=False)
    except ApiException as e:
        print(f"Exception when calling CoreV1Api->list_pod_for_all_namespaces: {e}")
        return None

def get_latest_image_version(docker_client, image_name):
    try:
        image_tags = docker_client.images.get_registry_data(image_name).attrs['RepoTags']
        # Filter out tags that are not version numbers
        version_tags = [tag for tag in image_tags if tag.replace('.', '').isdigit()]
        latest_version = sorted(version_tags, key=lambda s: list(map(int, s.split('.'))))[-1]
        return latest_version
    except DockerException as e:
        print(f"Exception when retrieving image data for {image_name}: {e}")
        return None

def main():
    k8s_client = get_k8s_client()
    docker_client = get_docker_client()

    pods = get_all_pods(k8s_client)
    if not pods:
        return

    result = []

    for pod in pods.items:
        namespace = pod.metadata.namespace
        pod_name = pod.metadata.name
        for container in pod.spec.containers:
            container_name = container.name
            current_image = container.image
            latest_image_version = get_latest_image_version(docker_client, current_image)

            result.append({
                "namespace": namespace,
                "pod": pod_name,
                "container": container_name,
                "current_image": current_image,
                "latest_image_version": latest_image_version
            })

    print("Namespace\tPod\t\tContainer\tCurrent Image\t\tLatest Image Version")
    for entry in result:
        print(f"{entry['namespace']}\t{entry['pod']}\t{entry['container']}\t{entry['current_image']}\t{entry['latest_image_version']}")

if __name__ == "__main__":
    main()
