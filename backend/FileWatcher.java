import java.io.IOException;
import java.nio.file.*;

class FileWatcher{
    public static void main(String[] args) throws IOException, InterruptedException{
        String folderPath = "../frontend/src/Resources"; //Por modificar

        WatchService watchService= FileSystems.getDefault().newWatchService();

        Path path = Paths.get(System.getProperty(folderPath)); 

        path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);

        WatchKey key;
        while ((key = watchService.take()) != null) {
            for (WatchEvent<?> event : key.pollEvents()) {

                FileGenerator.generateFile(folderPath+event.context());
                
            }
            
            key.reset();
        }
    }
}