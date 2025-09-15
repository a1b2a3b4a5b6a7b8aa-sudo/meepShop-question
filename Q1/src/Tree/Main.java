package Tree;

public class Main {
    public static void main(String[] args) {
        Integer[] input = {5, 3, 8, 1, 7, 2, 6};
//        Integer[] input = {6, 8, 9};
//        Integer[] input = {5, 3, 8, 1, 7, 2, 6, 100, 3, -1};
        TreeNode root = TreeUtils.buildTree(input);

        TreeNode result = TreeInverter.invert(root);

        System.out.println(TreeUtils.printLevelOrder(result));
    }
}