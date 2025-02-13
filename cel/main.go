package main

import (
	"fmt"
	"github.com/golang/glog"
	"github.com/google/cel-go/cel"
	yaml "gopkg.in/yaml.v3"
	"io/ioutil"
	"os"
	"reflect"
)

type KRM map[string]interface{}

func main() {

	// TODO: Read yaml
	d := readFile("files/pod.yaml")
	//fmt.Printf("%v", d)

	// TODO: Create CEL Env
	env := celEnv()

	ast := compile(env, `has(krm.metadata.name) && krm.metadata.name.contains('argo') && path.contains("/envs/prod")`, cel.BoolType)

	pg, _ := env.Program(ast)

	out, _, _ := pg.Eval(map[string]interface{}{
		"krm":  d,
		"path": "/k8s/envs/prod/pod.yaml",
	})

	fmt.Println(out)
}

func readFile(filePath string) map[string]interface{} {

	yamlFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		fmt.Printf("Error reading YAML file: %v\n", err)
		os.Exit(1)
	}

	var data map[string]interface{}

	err = yaml.Unmarshal(yamlFile, &data)
	if err != nil {
		fmt.Printf("Error unmarshaling YAML: %v\n", err)
		os.Exit(1)
	}

	return data
}

func celEnv() *cel.Env {
	env, err := cel.NewEnv(
		//cel.Types(KRM{}),
		cel.Variable("krm", cel.MapType(cel.StringType, cel.AnyType)),
		cel.Variable("path", cel.StringType),
	)

	if err != nil {
		glog.Exit(err)
	}

	return env
}

func compile(env *cel.Env, expr string, celType *cel.Type) *cel.Ast {
	fmt.Println("running compile")
	ast, iss := env.Compile(expr)
	if iss.Err() != nil {
		glog.Exit(iss.Err())
	}
	if !reflect.DeepEqual(ast.OutputType(), celType) {
		glog.Exitf(
			"Got %v, wanted %v result type", ast.OutputType(), celType)
	}

	fmt.Println("successfully compiled")
	return ast
}
