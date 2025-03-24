package main

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func untarGz(tarFile string, target string) error {

	file, err := os.Open(tarFile)

	if err != nil {
		return err
	}

	uncompressedStream, err := gzip.NewReader(file)
	if err != nil {
		return err
	}

	tarReader := tar.NewReader(uncompressedStream)

	for {
		header, err := tarReader.Next()

		if err == io.EOF {
			break
		}

		if err != nil {
			return err
		}

		path := filepath.Join(target, header.Name)

		switch header.Typeflag {
		case tar.TypeDir:
			if err := os.MkdirAll(path, 0755); err != nil {
				return err
			}
		case tar.TypeReg:
		case tar.TypeSymlink:
			outFile, err := os.Create(path)
			if err != nil {
				return err
			}

			//defer outFile.Close()

			if _, err := io.Copy(outFile, tarReader); err != nil {
				return err
			}
		default:
			return fmt.Errorf("unknown type: %b in %s", header.Typeflag, header.Name)
		}
	}

	return nil
}

func untar(tarFile string, destDir string) error {
	file, err := os.Open(tarFile)

	if err != nil {
		return err
	}

	//defer file.Close()

	tarReader := tar.NewReader(file)

	for {
		header, err := tarReader.Next()

		if err == io.EOF {
			break
		}

		if err != nil {
			return err
		}

		target := filepath.Join(destDir, header.Name)

		switch header.Typeflag {
		case tar.TypeDir:
			if err := os.MkdirAll(target, 0755); err != nil {
				return err
			}
		case tar.TypeReg:
			outFile, err := os.Create(target)
			if err != nil {
				return err
			}

			//defer outFile.Close()

			if _, err := io.Copy(outFile, tarReader); err != nil {
				return err
			}
		}
	}
	return nil
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run main.go <source.tar.gz> <destination>")
		return
	}

	source := os.Args[1]
	destination := os.Args[2]

	fmt.Println(fmt.Sprintf("extracting %s to %s", source, destination))

	_ = os.MkdirAll(destination, 0755)

	if strings.HasSuffix(source, ".tar") {
		err := untar(source, destination)

		if err != nil {
			fmt.Println(err)
			return
		}
	} else {
		err := untarGz(source, destination)
		if err != nil {
			fmt.Println(err)
			return
		}
	}

}
