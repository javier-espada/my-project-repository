import java.nio.file.*;

class FileWatcher{
    public static void main(String[] args) {
        path = "../frontend/src/Resources" //Por modificar

        WatchService watchService= FileSystems.getDefault().newWatchService();

        Path path = Paths.get(System.getProperty(path)); 

        path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);

        WatchKey key;
        while ((key = watchService.take()) != null) {
            for (WatchEvent<?> event : key.pollEvents()) {

                FileGenerator.generateFile(path+event.context());
                
            }
            
            key.reset();
        }
    }
}